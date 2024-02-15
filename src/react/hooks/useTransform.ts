import { isTrackedTransform } from '@dreamlab.gg/core/math'
import type {
  PositionListener,
  RotationListener,
  Transform,
  ZIndexListener,
} from '@dreamlab.gg/core/math'
import {
  useCallback,
  useEffect,
  useState,
} from 'https://esm.sh/v136/react@18.2.0'

/**
 * Return a reference to a {@link Transform} that will automatically trigger React re-renders
 *
 * @param transform - Transform
 * @param onChange - Optional handler that will trigger when any value changes
 */
export const useTransform = (
  transform: Transform,
  onChange?: (transform: Transform) => void,
): Transform => {
  const [_x, setX] = useState<number>()
  const [_y, setY] = useState<number>()
  const [_r, setRotation] = useState<number>()
  const [_z, setZIndex] = useState<number>()

  const triggerChange = useCallback(() => {
    if (typeof onChange === 'function') onChange(transform)
  }, [transform, onChange])

  const onPositionChanged = useCallback<PositionListener>(
    (component, value, _delta) => {
      if (component === 'x') setX(value)
      else if (component === 'y') setY(value)

      triggerChange()
    },
    [setX, setY, triggerChange],
  )

  const onRotationChanged = useCallback<RotationListener>(
    (value, _delta) => {
      setRotation(value)
      triggerChange()
    },
    [setRotation, triggerChange],
  )

  const onZIndexChanged = useCallback<ZIndexListener>(
    value => {
      setZIndex(value)
      triggerChange()
    },
    [setZIndex, triggerChange],
  )

  useEffect(() => {
    if (!isTrackedTransform(transform)) {
      throw new Error('`useTransform` only works with tracked transforms')
    }

    transform.addPositionListener(onPositionChanged)
    transform.addRotationListener(onRotationChanged)
    transform.addZIndexListener(onZIndexChanged)

    return () => {
      transform.removeListener(onPositionChanged)
      transform.removeListener(onRotationChanged)
      transform.removeListener(onZIndexChanged)
    }
  })

  return transform
}
